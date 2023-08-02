from pickle import TRUE
import os
import requests,time 
from bs4 import BeautifulSoup

url = "https://www.ptt.cc/bbs/Gossiping/index.html"
rs=requests.session()
headers={"User-Agent":"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Mobile Safari/537.36"}

payload = {'form':'/bbs/stock/index.html','yes':'yes'}
data=rs.post('https://www.ptt.cc/ask/over18',headers=headers,data=payload)
data = rs.get(url,headers=headers)
page = BeautifulSoup(data.text, "html.parser")
news = []
articlesContents = []
def checkformat(page, class_tag, data, index, url):

    try:

        content = page.select(class_tag)[index].text

    except:

        content='null'

    return content
# ppt 下一頁
def nextPage():
    global url, headers, data, page
    
    btn = page.select('div.btn-group > a')
    up_page_href = btn[3]['href']
    next_page_url = 'https://www.ptt.cc' + up_page_href
    url = next_page_url
    data=rs.post('https://www.ptt.cc/ask/over18',headers=headers,data=payload)
    data = rs.get(url,headers=headers)
    page = BeautifulSoup(data.text, "html.parser")

# 抓取新聞文章標題。網址 ----- [標題(str), 網址[single]]  amount:10 (tenth ~ twentieth)(no re)
def catchArticles():
    global url, headers, data, page, news
    news = []
    newsEnough = False

    while newsEnough != TRUE:
        titles = page.find_all("div", class_ = "title")
        count = 0
        for title in titles:
            if title.a != None:
                # print(title.a.text)
                # print(title.a["href"])
                if "新聞" in title.a.text:
                    if "Re: " not in title.a.text:
                        count += 1
                        if count > 5:
                            news.append([title.a.text, [title.a["href"]]])
                            # else:
                            #     for _news in news:
                            #         if "Re: "+_news[0] == title.a.text:
                            #             _news[1].append(title.a["href"])
                    if len(news) >= 5:
                        newsEnough = TRUE
                        break
        nextPage()
        
        

# def searchNews(): 未定
def getMessagesContent():
    global url, headers, data, page, news, messagesContents
    messagesContents=[[] for i in range(len(news))]
    for i in range(len(news)):
        url = 'https://www.ptt.cc' + news[i][1][0]
        data=rs.post('https://www.ptt.cc/ask/over18',headers=headers,data=payload)
        data = rs.get(url,headers=headers)
        page = BeautifulSoup(data.text, 'lxml')
        messages = page.find_all('div', 'push')
        
        for message in messages:
            #去除掉冒號和左右的空白
            messages = message.find('span','f3 push-content').getText().replace(':','').strip()
            messagesContents[i].append(messages)
    #print(messagesContents)
        #print(content[0])
        #去除掉文末 --
def MessagesContentStore():
    global url, headers, data, page, news, messagesContents
    for i in range(len(news)):
        path = 'D:\\project\\idk\\'+'messagesContent_'+str(i)+'.csv' 
        f = open(path, 'w', encoding='UTF-8')
        for j in range(len(messagesContents[i])):
            f.write(messagesContents[i][j]+ "\n")
        f.close()
# 抓取文章內容(內文， 推文)  

def getArticlesContent():
    global url, headers, data, page, news, articlesContents
    articlesContents  = []
    #date = checkformat(page, '.article-meta-value', 'date', 3, url)
    for _news in news:
        url = 'https://www.ptt.cc' + _news[1][0]
        data=rs.post('https://www.ptt.cc/ask/over18',headers=headers,data=payload)
        data = rs.get(url,headers=headers)
        page = BeautifulSoup(data.text, 'lxml')
        content = page.find(id="main-content").text
        target_content = u'※ 發信站: 批踢踢實業坊(ptt.cc),'
        #去除掉 target_content
        content = content.split(target_content)
        #print(content)
        #content = content[0].split(date)
        #content = content[0].split('--')
        #print(content[0])
        #去除掉文末 --
        articlesContents.append(content)
        
# 文章內容儲存成txt path根據情況更改
def ArticlesContentStore():
    global url, headers, data, page, news, articlesContents
    for i in range(5):
        path = 'D:\\project\\idk\\'+'articlesContent_'+str(i)+'.csv' 
        f = open(path, 'w', encoding='UTF-8')
        f.writelines(articlesContents[i])
        f.close()

catchArticles()
print("part 1")
getMessagesContent()
print("part 2")
getArticlesContent()
print("part 3")
ArticlesContentStore()
print("part 4")
MessagesContentStore()
print("part 5")

print("Done")








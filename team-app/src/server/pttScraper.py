from pickle import TRUE
import os
import requests as reqs
import bs4

url = "https://www.ptt.cc/bbs/Gossiping/index.html"

headers={"User-Agent":"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Mobile Safari/537.36"}

data = reqs.get(url, headers=headers, cookies={'over18':'1'})

page = bs4.BeautifulSoup(data.text, "html.parser")

news = []
articlesContents = []

# ppt 下一頁
def nextPage():
    global url, headers, data, page
    
    btn = page.select('div.btn-group > a')
    up_page_href = btn[3]['href']
    next_page_url = 'https://www.ptt.cc' + up_page_href
    url = next_page_url
    data = reqs.get(url, headers=headers, cookies={'over18':'1'})
    page = bs4.BeautifulSoup(data.text, "html.parser")
    # print(data.url)

# 抓取新聞文章標題。網址 ----- [標題(str), 網址[single]]  amount:10 (tenth ~ twentieth)(no re)
def catchArticles():
    global url, headers, data, page, news
    news = []
    newsEnough = False
    count = 0
    while newsEnough != TRUE:
        titles = page.find_all("div", class_ = "title")
        for title in titles:
            if title.a != None:
                # print(title.a.text)
                # print(title.a["href"])
                if "新聞" in title.a.text:
                    if "Re: " not in title.a.text:
                        count += 1
                        if count > 10:
                            news.append([title.a.text, [title.a["href"]]])
                            # else:
                            #     for _news in news:
                            #         if "Re: "+_news[0] == title.a.text:
                            #             _news[1].append(title.a["href"])
                    if len(news) >= 10 :
                        newsEnough = TRUE
                        break
        nextPage()

# 抓取文章內容(內文， 推文)  
def getArticlesContent():
    global url, headers, data, page, news, articlesContents
    articlesContents  = []
    
    for _news in news:
        url = 'https://www.ptt.cc' + _news[1][0]
        data = reqs.get(url, headers=headers, cookies={'over18':'1'})
        page = bs4.BeautifulSoup(data.text, "html.parser")
        mainContent = page.find("div", id="main-content")
        # print(mainContent.text)
        articlesContents.append(mainContent.text)
        
# 文章內容儲存成txt path根據情況更改
def ArticlesContentStore():
    global url, headers, data, page, news, articlesContents
    for i in range(10):
        path = 'D:\\project\\ptt\\idk\\articlesContent_'+str(i)+'.txt' 
        f = open(path, 'w', encoding='UTF-8')
        f.writelines(articlesContents[i])
        f.close()



catchArticles()
print("part 1")

getArticlesContent()
print("part 2")

ArticlesContentStore()
print("Done")
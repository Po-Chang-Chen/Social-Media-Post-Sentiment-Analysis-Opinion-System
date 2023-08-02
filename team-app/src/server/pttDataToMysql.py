import MySQLdb
try:
        # 建立Connection物件
        db = MySQLdb.connect(host="localhost",   
                 user="root",        
                 passwd="123456",  
                 db="pttDatabase", charset="utf8")
        cursor = db.cursor()
except:
        print("Can't connect to database")
print('Connection successful')

def deleteTableData_news():
        query = ("DELETE  from News;")

        try:
                cursor.execute(query)
                db.commit()
        except (MySQLdb.Error):
                print('error')
        print('delete successful')
def deleteTableData_comments():
        query = ("DELETE  from comments;")

        try:
                cursor.execute(query)
                db.commit()
        except (MySQLdb.Error):
                print('error')
        print('delete successful')
def contentTransfer(num):
        path = 'D:\\project\\idk\\articlesContent_'+str(num)+'.csv' 
        file = open(path, 'r',encoding="utf-8")
        
        file_content = file.readline().split('[新聞]')[1]
        newsTitle = file_content[0: len(file_content)-27]
        #print(newsTitle)
        newsArticle = ""
        while True:
            file_content = file.readline()
            if file_content != '--\n':
                newsArticle+=file_content
            else:
                break
            #print(newsArticle)
        query = ("INSERT News(id,news_title,news_content) VALUES (%s,%s,%s)")
        try:
            cursor.execute(query, (int(num)+1,newsTitle, newsArticle))
            db.commit()
        except (MySQLdb.Error):
            print('error')
def messageTransfer(num):
        path = 'D:\\project\\idk\\messagesContent_'+str(num)+'.csv' 
        file = open(path, 'r',encoding="utf-8")
        #message_content=[]
        for line in file.readlines():
            query = ("INSERT INTO comments(news_id,comments_content) VALUES (%s,%s)")
            cursor.execute(query, (int(num)+1,line))
            db.commit()

deleteTableData_news()
deleteTableData_comments()
for i in range(5):
        contentTransfer(i)
        messageTransfer(i)
        print(str(i)+' complete')

db.close()
# for i in range(10):
#         path = 'articlesContent_'+str(i)+'.txt' 
#         file = open(path, 'r')
#         file_content = file.read()
        
#         file.close()


# query = "INSERT INTO EM VALUES (%s,%s,%s,%s,%s,%s)"

# cursor.execute(query, (file_content,))

# db.commit()
# db.close()
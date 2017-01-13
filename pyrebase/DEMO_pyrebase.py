import pyrebase
import dbconfig
import getpass
import json

dbconfig = dbconfig.dbconfig
firebase = pyrebase.initialize_app(dbconfig)
rootRef = firebase.database()


def login():
	email = raw_input("email: ")
	pwd = getpass.getpass("password: ")
	auth = firebase.auth()
	user = auth.sign_in_with_email_and_password(email, pwd)
	return user['localId']
def order(uid):
	title = raw_input("title: ")
	ordernum = raw_input("ordernum: ")
	if title == "guava":
		pid = "-KZMSQLi30mJ9DYlzdHj"
	else :
		pid = "-KZMZ4w6Jq2EoVbGQDgG"
	productroute = "products/"+pid
	product = rootRef.child(productroute).get().val()
	neworder = { "img" : product["img"], "ordernum" : ordernum, "pid" : pid, "price" : product["price"], "title" : product["title"], "uid": uid }
	rootRef.child("orders").push(neworder)
	rootRef.child(productroute).get().val().update({"numleft": product["numleft"]})

uid = login()
order(uid)




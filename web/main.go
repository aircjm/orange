package main

import (
	"github.com/aircjm/orange/web/postgres"
	"github.com/aircjm/orange/web/postgres/account"
	"github.com/aircjm/orange/web/postgres/article"
	"github.com/aircjm/orange/web/postgres/project"
	"github.com/aircjm/orange/web/postgres/topic"
	"github.com/aircjm/orange/web/serve"
	"log"
)

func dbOp() {

	account.Create(postgres.Client)
	article.Create(postgres.Client)
	topic.Create(postgres.Client)
	project.Create(postgres.Client)
	account.InsertAdminUser(postgres.Client)

}

func serverOp() {
	serve.App()
}

func main() {
	dbOp()
	log.Println("初始化DB成功，开始初始化http服务")
	serverOp()

}

package main

import (
	"database/sql"
	"github.com/aircjm/orange/web/postgres"
	"github.com/aircjm/orange/web/postgres/account"
	"github.com/aircjm/orange/web/postgres/article"
	"github.com/aircjm/orange/web/postgres/project"
	"github.com/aircjm/orange/web/postgres/topic"
	"github.com/aircjm/orange/web/serve"
)

func dbOp() {

	account.Create(postgres.Client)
	article.Create(postgres.Client)
	topic.Create(postgres.Client)
	project.Create(postgres.Client)
	account.InsertAdminUser(postgres.Client)

}

func initDatabase(db *sql.DB) {
	_, err := db.Exec("CREATE DATABASE Website;")
	if err != nil {
		panic(err)
	}
}
func serverOp() {
	serve.App()
}

func main() {

	dbOp()
	serverOp()

}

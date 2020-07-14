package main

import (
	"database/sql"
	"github.com/Jansora/pancake/web/postgres"
	"github.com/Jansora/pancake/web/postgres/account"
	"github.com/Jansora/pancake/web/postgres/article"
	"github.com/Jansora/pancake/web/postgres/project"
	"github.com/Jansora/pancake/web/postgres/topic"
	"github.com/Jansora/pancake/web/serve"
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

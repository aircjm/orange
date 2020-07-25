package postgres

import (
	"database/sql"
	"github.com/aircjm/orange/web/tools"
	_ "github.com/lib/pq"
)

func client() *sql.DB {

	db, err := sql.Open("postgres", tools.Conf.PG.Connect())

	if err != nil {
		panic(err)
	}
	return db
}

var Client = client()

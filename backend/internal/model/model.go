package GameSite

type Games struct {
	Name        string `json:"name"`
	Image       string `json:"image"`
	Description string `json:"description"`
	Item
	Account
	Service
}

/* type CSGO struct {
	Id   string `json:"id"`
	Name string
	Account
	Item
	Service

}

type Apex struct {
	Id   string `json:"id"`
	Name string
	Account
	Service
	Image string
} */

type Account struct {
	Id string
	Coast        float64
	Availability bool
	Desc         string
}

type Item struct {
	Id string
	Name  string
	Coast float64
	Desc  string
	Count int64
	Image string
}
type Service struct {
	Id string
	Coast        float64
	Availability bool
	Desc         string
}

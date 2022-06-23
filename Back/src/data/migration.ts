import connection from "./connection";

function createTables() {
    connection.raw(`
        create table cine_users(
            id varchar(255) primary key,
            name varchar(255) not null,
            password varchar(255) not null,
            email varchar(255) not null
        );

        create table cine_movies(
            id varchar(255) primary key,
            nome varchar(255) not null,
            img_url varchar(255) not null,
            descricao varchar(255) not null
        );

        create table cine_produts(
            id varchar(255) primary key,
            nome varchar(255) not null,
            preco double not null,
        );
        
        create table buy_ticket(
            ticketID varchar(255) not null,
            userID varchar(255) not null,
            quantidade int not null,
            foreign key (ticketID) references cine_movies(id),
            foreign key (userID) references cine_users(id)
        );

        create table buy_products(
            productID varchar(255) not null,
            userID varchar(255) not null,
            quantidade int not null,
            foreign key (productID) references cine_produts(id),
            foreign key (userID) references cine_users(id)
        );

    `)
        .then(() => {
            console.log('tabelas criadas')
            populationTables()
        })
        .catch((error: any) => {
            console.log(error.message || error.sqlmessage)
        })
}

function populationTables() {
    connection.raw(`
        insert into cine_users(id,name,password,email)
        values('b728e4c3-89d5-4239-ad72-a9e7deffede6','arthur', '$2a$12$/Llca7mt.09zgwVqiDLLR.2stXN0uPpw7pkcsvTyu8A57dnIAsdBS','fd@gmail.com');

        insert into cine_movies(id, nome,img_url,descricao)
        values('1', 'luca','https://images-na.ssl-images-amazon.com/images/I/41-aAYkLKAL._SX339_BO1,204,203,200_.jpg', 'animação');

        insert into cine_produts(id,nome,preco)
        values('1','pipoca grande', 15);

        insert into cine_produts(id,nome,preco)
        values('4','refrigerante', 18);

        insert into buy_products(productID,userID,quantidade)
        values('1','b728e4c3-89d5-4239-ad72-a9e7deffede6', 3)

        insert into buy_ticket(ticketID,userID,quantidade)
        values('1','b728e4c3-89d5-4239-ad72-a9e7deffede6', 2)
    `)
    .then(() => {
        console.log('tabelas populadas')
    })
    .catch((error: any) => {
        console.log(error.message || error.sqlmessage)
    })

}

createTables()
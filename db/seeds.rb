# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Book.create(isbn: "978-0-06-231609-7", title:"Sapiens", notes:"A great read")
Book.create(isbn: "928-0-05-221419-4", title:"Animosity", notes:"It was ok")
Book.create(isbn: "923-0-26-222567-3", title:"Baffled", notes:"Funny!")
Book.create(isbn: "921-0-22-223567-3", title:"Counting Cows", notes:"Meh")
Book.create(isbn: "920-0-23-222567-3", title:"Down", notes:"Alright!")
Book.create(isbn: "923-3-24-222567-3", title:"Everything Is Perfect", notes:"Perfect read!")
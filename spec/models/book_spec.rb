require 'rails_helper'

RSpec.describe Book, type: :model do
  it "is valid with valid attributes" do
    expect(Book.new(title: 'Test Title', isbn: '02343')).to be_valid
  end
  it "is not valid without a title" do
    book = Book.new(title: nil, isbn: '000')
    expect(book).to_not be_valid
  end
  it "is not valid without a isbn" do
    book = Book.new(isbn: nil, title: 'Test Title1')
    expect(book).to_not be_valid
  end
  it "is not valid with a duplicate isbn" do
    book = Book.new(title: nil, isbn: '000')
    book2 = Book.new(title: nil, isbn: '000')
    expect(book2).to_not be_valid
  end
end

import {Component, OnInit} from '@angular/core';
import {BookService} from '../../../../services/services/book.service';
import {Router} from '@angular/router';
import {PageResponseBookResponse} from '../../../../services/models/page-response-book-response';
import {BookResponse} from '../../../../services/models/book-response';

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  bookResponse: PageResponseBookResponse = {content: []};
  protected page = 0;
  private size = 4;
  public message = "";
  protected level = "success";

  constructor(
    private bookService: BookService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
      this.findAllBooks();
    }

  // private findAllBooks() {
  //   this.bookService.findAllBooks({
  //     page: this.page,
  //     size: this.size
  //   }).subscribe({
  //     next: (books) => {
  //       console.log("Books API Response:", books);
  //       this.bookResponse = books;
  //     },
  //     error: (err) => {
  //       console.error("Error fetching books:", err);
  //     }
  //   })
  // }

  private findAllBooks() {
    this.bookService.findAllBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: async (response) => {
        if (response instanceof Blob) {
          // Convert Blob to JSON
          const text = await response.text();
          this.bookResponse = JSON.parse(text);
        } else {
          this.bookResponse = response; // Assign directly if it's already JSON
        }
        console.log("Books API Response:", this.bookResponse);
      },
      error: (err) => {
        console.error("Error fetching books:", err);
      }
    });
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBooks();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }

  goToLastPage() {
    this.page = this.bookResponse.totalPages as number - 1;
    this.findAllBooks();
  }

  get isLastPage(): boolean {
    return this.page == this.bookResponse.totalPages as number -1;
  }

  borrowBook(book: BookResponse) {
    this.message = "";
    this.bookService.borrowBook({
      "book-id": book.id as number,
    }).subscribe({
      next: () => {
        this.level = "success"
        this.message = "Book successfully added to your list!"
        console.log("Book successfully added to your list!")
      },
      error: (err) => {
        console.log(err);
        this.level = "error";
        this.message = "Book already borrowed!";
      }
    });

  }
}

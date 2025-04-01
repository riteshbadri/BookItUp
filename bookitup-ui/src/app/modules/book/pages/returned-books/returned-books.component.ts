import {Component, OnInit} from '@angular/core';
import {PageResponseBorrowedBookResponse} from '../../../../services/models/page-response-borrowed-book-response';
import {FeedbackRequest} from '../../../../services/models/feedback-request';
import {BorrowedBookResponse} from '../../../../services/models/borrowed-book-response';
import {BookService} from '../../../../services/services/book.service';
import {FeedbackService} from '../../../../services/services/feedback.service';

@Component({
  selector: 'app-returned-books',
  standalone: false,
  templateUrl: './returned-books.component.html',
  styleUrl: './returned-books.component.scss'
})
export class ReturnedBooksComponent implements OnInit {

  returnedBooks: PageResponseBorrowedBookResponse = {};
  page = 0;
  size = 5;
  message = "";
  level = "success"

  constructor(
    private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
    this.findAllReturnedBooks();
  }

  private findAllReturnedBooks() {
    this.bookService.findAllReturnedBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (response) => {
        // Check if the response is a Blob
        if (response instanceof Blob) {
          // Convert Blob to JSON
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const jsonData = JSON.parse(reader.result as string);
              console.log("Parsed JSON:", jsonData);
              this.returnedBooks =  jsonData;
            } catch (e) {
              console.error("Error parsing JSON:", e);
            }
          };
          reader.readAsText(response);
        } else {
          // Already parsed as JSON
          console.log("Response:", response);
          this.returnedBooks = response ;
        }
      },
      error: (error) => {
        console.error("Error fetching borrowed books:", error);
      }
    });
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllReturnedBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllReturnedBooks();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllReturnedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllReturnedBooks();
  }

  goToLastPage() {
    this.page = this.returnedBooks.totalPages as number - 1;
    this.findAllReturnedBooks();
  }

  get isLastPage(): boolean {
    return this.page == this.returnedBooks.totalPages as number -1;
  }


  approveBookReturn(books: BorrowedBookResponse) {
    if(!books.returned) {
      this.level = "error";
      this.message = "The book is not yet returned :("
      return;
    }
    this.bookService.approveReturnBorrowedBook({
      'book-id': books.id as number
    }).subscribe({
      next: () => {
        this.level = "success";
        this.message = "Book return approved :)"
        this.findAllReturnedBooks();
      }
    })
  }
}

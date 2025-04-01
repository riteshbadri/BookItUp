import {Component, OnInit} from '@angular/core';
import {PageResponseBorrowedBookResponse} from '../../../../services/models/page-response-borrowed-book-response';
import {BorrowedBookResponse} from '../../../../services/models/borrowed-book-response';
import {BookService} from '../../../../services/services/book.service';
import {FeedbackRequest} from '../../../../services/models/feedback-request';
import {FeedbackService} from '../../../../services/services/feedback.service';

@Component({
  selector: 'app-borrowed-book-list',
  standalone: false,
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.scss'
})
export class BorrowedBookListComponent implements OnInit{

  borrowedBooks: PageResponseBorrowedBookResponse = {};
  feedbackRequest: FeedbackRequest = {bookId: 0, comment: "", note: 0};
  page = 0;
  size = 5;
  protected selectedBook: BorrowedBookResponse | undefined = undefined;

  constructor(
    private bookService: BookService,
    private feedbackService: FeedbackService
  ) {
  }

  ngOnInit(): void {
      this.findAllBorrowedBooks();
  }

  returnBorrowedBooks(book: BorrowedBookResponse) {
    this.selectedBook = book;
    this.feedbackRequest.bookId = book.id as number;
  }

  private findAllBorrowedBooks() {
    this.bookService.findAllBorrowedBooks({
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
              this.borrowedBooks =  jsonData;
            } catch (e) {
              console.error("Error parsing JSON:", e);
            }
          };
          reader.readAsText(response);
        } else {
          // Already parsed as JSON
          console.log("Response:", response);
          this.borrowedBooks = response ;
        }
      },
      error: (error) => {
        console.error("Error fetching borrowed books:", error);
      }
    });
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBorrowedBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBorrowedBooks();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllBorrowedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBorrowedBooks();
  }

  goToLastPage() {
    this.page = this.borrowedBooks.totalPages as number - 1;
    this.findAllBorrowedBooks();
  }

  get isLastPage(): boolean {
    return this.page == this.borrowedBooks.totalPages as number -1;
  }

  returnBook(withFeedback: boolean) {
    this.bookService.returnBorrowedBook({
      'book-id': this.selectedBook?.id as number
    }).subscribe({
      next: () => {
        if(withFeedback) {
          this.giveFeedback();
        }
        this.selectedBook = undefined;
        this.findAllBorrowedBooks();
      }
    });
  }

  private giveFeedback() {
    this.feedbackService.saveFeedback({
      body: this.feedbackRequest
    }).subscribe({
      next: () => {

      }
    });
  }
}

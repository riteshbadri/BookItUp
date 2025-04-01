import {Component, OnInit} from '@angular/core';
import {BookRequest} from '../../../../services/models/book-request';
import {BookService} from '../../../../services/services/book.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-manage-book',
  standalone: false,
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss'
})
export class ManageBookComponent implements OnInit{

  bookRequest: BookRequest = {authorName: "", isbn: "", synopsis: "", title: ""};
  errorMsg: Array<String> = [];
  selectedBookCover: any;
  selectedPicture: string | undefined ;

  constructor(
    private bookService: BookService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
  }

  // ngOnInit(): void {
  //   const bookId = this.activateRoute.snapshot.params['bookId'];
  //   if(bookId) {
  //     this.bookService.findBookById({
  //       "book-id": bookId
  //     }).subscribe({
  //       next: (book) => {
  //         this.bookRequest = {
  //           id: book.id,
  //           title: book.title as string,
  //           authorName: book.authorName as string,
  //           isbn: book.isbn as string,
  //           synopsis: book.synopsis as string,
  //           shareable: book.shareable
  //         }
  //       }
  //     })
  //   }
  // }

  //todo not able to add or update book cover
  //todo update books (adds another instance of the book )
  //todo update books (does not retain original information )
  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      const bookId = Number(params.get('bookId'));

      if (bookId && !isNaN(bookId)) {
        this.bookService.findBookById({"book-id": bookId}).subscribe({
          next: (book) => {
            console.log("Book detailes fetched: ", book);
            if(book) {
              this.bookRequest = {
                id: book.id,
                title: book.title as string,
                authorName: book.authorName as string,
                isbn: book.isbn as string,
                synopsis: book.synopsis as string,
                shareable: book.shareable
              };
              }
          },
          error: (err) => {
            console.error("Error fetching book:", err);
          }
        });
      } else {
        console.error("Invalid book ID:", params.get('bookId'));
      }
    });
  }



  onFileSelected(event: any) {
    this.selectedBookCover = event.target.files[0];
    console.log(this.selectedBookCover);
    if(this.selectedBookCover) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      }
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

   saveBook() {
     this.bookService.saveBook({
       body: this.bookRequest
     }).subscribe({
       next: (response) => {
         console.log(typeof response)
         console.log(response)
         const bookId = Number(response); // Ensure it's a number
         console.log("bookId received:", bookId);

         if (isNaN(bookId) || bookId <= 0) {
           console.error("Invalid bookId:", bookId);
           return;
         }

         // todo upload book cover
         this.bookService.uploadBookCover({
           'book-id': bookId,
           body: {
             file: this.selectedBookCover
           }
         }).subscribe({
           next: () => {
             this.router.navigate(['/books/my-books']);
           },
           error: (err) => {
             console.error("Upload error:", err);
           }
         });
       },
       error: (err) => {
         this.errorMsg = err.error.validationErrors;
       }
     });

   }

}

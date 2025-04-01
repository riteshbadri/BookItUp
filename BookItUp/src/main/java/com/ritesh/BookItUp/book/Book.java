package com.ritesh.BookItUp.book;

import com.ritesh.BookItUp.common.BaseEntity;
import com.ritesh.BookItUp.feedback.Feedback;
import com.ritesh.BookItUp.history.BookTransactionHistory;
import com.ritesh.BookItUp.user.User;
import jakarta.persistence.*;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Book extends BaseEntity {

//    @Id
//    @GeneratedValue
//    private Integer id;

    private String title;
    private String authorName;

    @Column(nullable = false, unique = true)
    private String isbn;

    private String synopsis;
    private String bookCover;
    private boolean archived;
    private boolean shareable;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "book")
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "book")
    private List<BookTransactionHistory> histories;

//    @Transient
//    public double getRate() {
//        if(feedbacks == null || feedbacks.isEmpty()) {
//            return 0.0;
//        }
//        var rate = this.feedbacks.stream()
//                .mapToDouble(Feedback::getNote)
//                .average()
//                .orElse(0.0);
//        double roundedRate = Math.round(rate*10.0)/10.0;
//        return roundedRate;
//    }
    @Transient
    public double getRate() {
        if (feedbacks == null || feedbacks.isEmpty()) {
            return 0.0;
        }

        for (Feedback fb : feedbacks) {
            if (fb == null) {
                System.out.println("Found a null feedback object!");
            } else if (fb.getNote() == null) {
                System.out.println("Found a feedback with null note!");
            }
        }

        return feedbacks.stream()
                .filter(Objects::nonNull)
                .map(Feedback::getNote)
                .filter(Objects::nonNull)
                .mapToDouble(Double::doubleValue)
                .average()
                .orElse(0.0);
    }


}

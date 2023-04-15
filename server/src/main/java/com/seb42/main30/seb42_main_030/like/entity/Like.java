package com.seb42.main30.seb42_main_030.like.entity;

import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "Likes")
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diaryId")
    private Diary diary;

    @Column
    private long userId;

    public Like(Diary diary, long userId) {
        this.diary = diary;
        this.userId = userId;
    }
}

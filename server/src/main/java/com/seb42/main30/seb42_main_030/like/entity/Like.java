package com.seb42.main30.seb42_main_030.like.entity;

import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import com.seb42.main30.seb42_main_030.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    private long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    //@JoinColumn(name = "userId")
    private User user;

    public Like(Diary diary, long userId) {
        this.diary = diary;
        this.userId = userId;
    }

//    // user 맵핑(한 like:한 user)
//    @OneToOne(mappedBy = "like")
//    @JoinColumn(name = "userId")
//    private User user ;
}

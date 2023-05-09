package com.seb42.main30.seb42_main_030.diary.entity;


import com.seb42.main30.seb42_main_030.audit.Auditable;
import com.seb42.main30.seb42_main_030.comment.entity.Comment;
import com.seb42.main30.seb42_main_030.like.entity.Like;
import com.seb42.main30.seb42_main_030.playlist.entity.Playlist;
import com.seb42.main30.seb42_main_030.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@NoArgsConstructor
@Getter
@Setter
@Entity
@Table
@Component
public class Diary extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long diaryId;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "text", nullable = false)
    private String body;

    @Column(nullable = false)
    private int viewCount;

    private int likeCount;

//    @Column(name = "createdAt", insertable = false, updatable = false)
//    private LocalDateTime createdAt;
//
//    @Column(name = "modifiedAt", insertable = false, updatable = false)
//    private LocalDateTime modifiedAt;

    private LocalDateTime createdAt = LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES);
    private LocalDateTime modifiedAt = LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES);

    @ManyToOne(targetEntity = User.class, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToMany(mappedBy = "diary", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "diary", cascade = CascadeType.REMOVE)
    private List<Playlist> playlists = new ArrayList<>();

    // Like 1:N
    @OneToMany(mappedBy = "diary", cascade = CascadeType.ALL)
    private List<Like> likeDiariesList = new ArrayList<>();

//
    @Column
    private String tags;

        public List<String> getTags() {
            if (tags == null || tags.isEmpty()) {
                return new ArrayList<>();
            }
            return Arrays.asList(tags.split(","));
        }

        public void setTags(String tagList) {
            this.tags = String.join(",", tagList);
        }

}

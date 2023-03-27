package com.seb42.main30.seb42_main_030.playlist.entity;

import com.seb42.main30.seb42_main_030.audit.Auditable;
import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import com.seb42.main30.seb42_main_030.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Playlist extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long playlistId;

    @Column
    private String title;
    @Column
    private String album;
    @Column
    private String track;

    // 연관관계 매핑
    @ManyToOne
    @JoinColumn(name = "diaryId")
    private Diary diary;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @OneToMany(mappedBy = "playlist", cascade = CascadeType.REMOVE)
    private List<Song> songs = new ArrayList<>();
    @Column

    private int likePlus = 0;

}

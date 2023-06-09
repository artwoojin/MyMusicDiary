package com.seb42.main30.seb42_main_030.playlist.entity;


import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Playlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long playlistId;

    @Column
    private String thumbnail;

    @Column
    private String title;

    @Column
    private String url;

    @Column
    private String channelTitle;



    @ManyToOne(targetEntity = Diary.class, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "diary_id")
    private Diary diary;

}

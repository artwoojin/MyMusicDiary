package com.seb42.main30.seb42_main_030.tag.entity;

import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Tag {
    @Id
    private long tagId;

    @Column
    private String tagName;

    @ManyToMany(mappedBy = "tags")
    private List<Diary> diaries = new ArrayList<>();

    public Tag(long tagId, String tagName) {
        this.tagId = tagId;
        this.tagName = tagName;
    }

    public void updateDiaries(Diary diary){
        this.diaries.add(diary);
    }
}

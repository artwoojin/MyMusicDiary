package com.seb42.main30.seb42_main_030.tag.service;

import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import com.seb42.main30.seb42_main_030.tag.entity.Tag;
import com.seb42.main30.seb42_main_030.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;



@Service
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;

    public List<Tag> save(List<Long> tagIds, Diary diary) {
        List<Tag> tags = new ArrayList<>();
        for (long tagId : tagIds) {
            Tag tag = tagRepository.findById(tagId).get();
            tag.updateDiaries(diary);

            tagRepository.save(tag);
            tags.add(tag);
        }
        return tags;
    }

    public Tag find(long tagId) {
        return tagRepository.findById(tagId).get();
    }

    public List<Tag> findAll(List<Long> tagIds) {
        return tagRepository.findAllByTagIdIn(tagIds);
    }

}


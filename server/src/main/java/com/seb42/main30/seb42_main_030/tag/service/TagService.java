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

    public List<Tag> save(List<String> tagNames, Diary diary) {
        List<Tag> tags = new ArrayList<>();
        for (String tagName : tagNames) {
            Tag tag = tagRepository.findByTagName(tagName).get();
            tag.updateDiaries(diary);

            tagRepository.save(tag);
            tags.add(tag);
        }
        return tags;
    }

    public Tag find(String tagName) {
        return tagRepository.findByTagName(tagName).get();
    }

    public List<Tag> findAll(List<String> tagNames) {
        return tagRepository.findAllByTagNameIn(tagNames);
    }

}


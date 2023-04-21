package com.seb42.main30.seb42_main_030.tag.repository;

import com.seb42.main30.seb42_main_030.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByTagName(String tagName);

    List<Tag> findAllByTagIdIn(List<Long> tagIds);


}

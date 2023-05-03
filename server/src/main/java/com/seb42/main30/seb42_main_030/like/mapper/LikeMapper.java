package com.seb42.main30.seb42_main_030.like.mapper;

import com.seb42.main30.seb42_main_030.like.Dto.LikeDto;
import com.seb42.main30.seb42_main_030.like.entity.Like;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Service;

@Service
@Mapper(componentModel = "spring")
public interface LikeMapper {
    LikeDto.Response likeToResponse(Like findLike);
}

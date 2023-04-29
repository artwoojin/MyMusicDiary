package com.seb42.main30.seb42_main_030.like.mapper;

import com.seb42.main30.seb42_main_030.like.Dto.LikeDto;
import com.seb42.main30.seb42_main_030.like.entity.Like;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-04-29T15:09:59+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class LikeMapperImpl implements LikeMapper {

    @Override
    public LikeDto.Response likeToResponse(Like findLike) {
        if ( findLike == null ) {
            return null;
        }

        LikeDto.Response.ResponseBuilder response = LikeDto.Response.builder();

        if ( findLike.getLikeId() != null ) {
            response.likeId( findLike.getLikeId() );
        }
        response.userId( findLike.getUserId() );

        return response.build();
    }
}

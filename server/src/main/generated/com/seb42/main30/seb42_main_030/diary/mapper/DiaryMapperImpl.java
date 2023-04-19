package com.seb42.main30.seb42_main_030.diary.mapper;

import com.seb42.main30.seb42_main_030.diary.dto.DiaryDto;
import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-04-19T15:36:44+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class DiaryMapperImpl implements DiaryMapper {

    @Override
    public List<DiaryDto.Response> diaryToResponses(Page<Diary> diaries) {
        if ( diaries == null ) {
            return null;
        }

        List<DiaryDto.Response> list = new ArrayList<DiaryDto.Response>();
        for ( Diary diary : diaries ) {
            list.add( diaryToResponse( diary ) );
        }

        return list;
    }

    @Override
    public List<DiaryDto.Response> diariesToDtos(List<Diary> likeDiaryList) {
        if ( likeDiaryList == null ) {
            return null;
        }

        List<DiaryDto.Response> list = new ArrayList<DiaryDto.Response>( likeDiaryList.size() );
        for ( Diary diary : likeDiaryList ) {
            list.add( diaryToResponse( diary ) );
        }

        return list;
    }
}

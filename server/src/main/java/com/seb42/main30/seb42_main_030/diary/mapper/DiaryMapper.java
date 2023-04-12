package com.seb42.main30.seb42_main_030.diary.mapper;


import com.seb42.main30.seb42_main_030.comment.dto.CommentDto;
import com.seb42.main30.seb42_main_030.comment.entity.Comment;
import com.seb42.main30.seb42_main_030.diary.dto.DiaryDto;
import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import com.seb42.main30.seb42_main_030.playlist.dto.PlaylistResponseDto;
import com.seb42.main30.seb42_main_030.playlist.entity.Playlist;
import com.seb42.main30.seb42_main_030.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface DiaryMapper {

    default Diary diaryPostToDiary (DiaryDto.Post post, User user) {
        if (post == null) {
            return null;
        } else {
            Diary diary = new Diary();
            diary.setTitle(post.getTitle());
            diary.setBody(post.getBody());
            diary.setUser(user);

            return diary;
        }
    }
    default Diary diaryPatchToDiary (DiaryDto.Patch patch) {
        if (patch == null) {
            return null;
        } else {
            Diary diary = new Diary();
            diary.setTitle(patch.getTitle());
            diary.setBody(patch.getBody());

            return diary;
        }
    }




//    @Named("playlistToPlaylistDto")
//    @Mapping(source = "diary.diaryId", target = "diaryId")
//    PlaylistDto.Response playlistToPlaylistDto(Playlist playlist);

    //    @Mapping(source = "playlists", target = "playlists", qualifiedByName = "playlistToPlaylistDto")
//    @Mapping(source = "user.nickname", target = "userNickname")
//    @Mapping(source = "comments", target = "comments", qualifiedByName = "commentToCommentDto")
    default DiaryDto.Response diaryToResponse(Diary diary) {
        if (diary == null) {
            return null;
        } else {
            List<Comment> comments = diary.getComments();
            DiaryDto.Response.ResponseBuilder  diaryDto = DiaryDto.Response.builder();
            List<Playlist> playlists = diary.getPlaylists();
            diaryDto.diaryId(diary.getDiaryId());
            diaryDto.title(diary.getTitle());
            diaryDto.body(diary.getBody());
            diaryDto.createdAt(diary.getCreatedAt());
            diaryDto.modifiedAt(diary.getModifiedAt());
            diaryDto.userNickname(diary.getUser().getNickname());
            diaryDto.viewCount(diary.getViewCount());
            diaryDto.likeCount(diary.getLikeCount());



            diaryDto.playlists(playlistsToPlaylistResponseDto(playlists));
            diaryDto.comments(commentToCommentDto(comments));
            return diaryDto.build();
        }
    }

    default List<PlaylistResponseDto> playlistsToPlaylistResponseDto(List<Playlist> playlists) {
        return  playlists
                .stream()
                .map(playlist -> PlaylistResponseDto
                        .builder()
                        .url(playlist.getUrl())
                        .title(playlist.getTitle())
                        .thumbnail(playlist.getThumbnail())
                        .channelId(playlist.getChannelId())
                        .build())
                .collect(Collectors.toList());
    }

//    @Mapping(source = "comments", target = "comments", qualifiedByName = "commentToCommentDto")
//    List<DiaryDto.Response> diaryToResponses(List<Diary> diaries);





//    @Mapping(source = "playlists", target = "playlists", qualifiedByName = "playlistToPlaylistDto")
//    @Mapping(source = "comments", target = "comments", qualifiedByName = "commentToCommentDto")
    List<DiaryDto.Response> diaryToResponses(List<Diary> diarys);

//    @Named("commentToCommentDto")
//    @Mapping(source = "user.nickname", target = "userNickname")
//    @Mapping(source = "diary.diaryId", target = "diaryId")
    default List<CommentDto.Response> commentToCommentDto(List<Comment> comments){
        return comments
                .stream()
                .map(comment -> CommentDto.Response
                        .builder()
                        .commentId(comment.getCommentId())
                        .diaryId(comment.getDiary().getDiaryId())
                        .body(comment.getBody())
                        .createdAt(comment.getCreatedAt())
                        .modifiedAt(comment.getModifiedAt())
                        .userNickname(comment.getUser().getNickname())
                        .build())
                .collect(Collectors.toList());
    }

}

package com.seb42.main30.seb42_main_030.playlist.mapper;//package com.seb42.main30.seb42_main_030.playlist.mapper;
//
//
//import com.seb42.main30.seb42_main_030.playlist.dto.PlaylistDto;
//import com.seb42.main30.seb42_main_030.playlist.entity.Playlist;
//import org.mapstruct.Mapper;
//import org.mapstruct.Mapping;
//
//import java.util.List;
//
//@Mapper(componentModel = "spring")
//public interface PlaylistMapper {
//    @Mapping(source = "diaryId", target = "diary.diaryId")
//    Playlist playlistPostToPlaylist (PlaylistDto.Post post);
//
//    @Mapping(source = "diaryId", target = "diary.diaryId")
//    Playlist playlistPatchToPlaylist (PlaylistDto.Patch patch);
//
//    @Mapping(source = "diary.diaryId", target = "diaryId")
//    PlaylistDto.Response playlistToPlaylistDto(Playlist playlist);
//
//    List<PlaylistDto.Response> playlistsToResponses (List<Playlist> playlists);
//
//}
package com.seb42.main30.seb42_main_030.playlist.controller;

import com.seb42.main30.seb42_main_030.playlist.dto.PlaylistPatchDto;
import com.seb42.main30.seb42_main_030.playlist.dto.PlaylistPostDto;
import com.seb42.main30.seb42_main_030.playlist.entity.Playlist;
import com.seb42.main30.seb42_main_030.playlist.mapper.PlaylistMapper;
import com.seb42.main30.seb42_main_030.playlist.service.PlaylistService;
import com.seb42.main30.seb42_main_030.response.MultiResponseDto;
import com.seb42.main30.seb42_main_030.response.SingleResponseDto;
import com.seb42.main30.seb42_main_030.user.entity.User;
import com.seb42.main30.seb42_main_030.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/playlists")
@Valid
public class PlaylistController {
    private final PlaylistService playlistService;
    private final PlaylistMapper playlistmapper;
    private final UserService userService;

    // 플레이리스트 생성
    @PostMapping
    public ResponseEntity postPlaylist(@Valid @RequestBody PlaylistPostDto playlistPostDto, Long authUserId) throws Exception {
        User user = userService.findUser(authUserId);
                                    /* 인증된 유저 호출 필요*/
        Playlist playlist = playlistmapper.playlistPostDtoToPlaylist(playlistPostDto, user);

        Playlist savedPlaylist = playlistService.createPlaylist(playlist, playlistPostDto);

        return new ResponseEntity<>(
                new SingleResponseDto<>(playlistmapper.playlistToPlaylistResponseDto(savedPlaylist)), HttpStatus.CREATED);
    }

    @PatchMapping("/{playlist-id}")
    public ResponseEntity patchPlaylist(@PathVariable("playlist-id") @Positive long playlistId,
                                        @Valid @RequestBody PlaylistPatchDto playlistPatchDto, Long authUserId) {
        playlistPatchDto.setPlaylistId((playlistId));

        User user = userService.findUser(authUserId);

        Playlist playlist = playlistmapper.playlistPatchDtoToPlaylist(playlistPatchDto);
        Playlist savedPlaylist = playlistService.updatePlaylist(playlist, playlistPatchDto, authUserId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(playlistmapper.playlistToPlaylistResponseDto(savedPlaylist)), HttpStatus.OK);
    }
    // 플레이리스트 검색
    @GetMapping("/search")
    public ResponseEntity searchMembers(@RequestParam(defaultValue = "1") int page,
                                        @RequestParam(defaultValue = "6") int size,
                                        @RequestParam String type, @RequestParam String name) {

        Page<Playlist> pagePlaylists = playlistService.searchPlaylists(type, name, page-1, size);
        List<Playlist> playlists = pagePlaylists.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(playlistmapper.playlistToPlaylistResponseDtoList(playlists), pagePlaylists), HttpStatus.OK);

    }

    // 플레이리스 조회
    @GetMapping
    public ResponseEntity getPlayList(@Positive @RequestParam(required = false, defaultValue = "1") int page,
                                      @Positive @RequestParam(required = false, defaultValue = "10") int size) {
        Page<Playlist> pagePlList = playlistService.findPlayList(page - 1, size);
        List<Playlist> playlists = pagePlList.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(playlistmapper.playlistToPlaylistResponseDtoList(playlists), pagePlList), HttpStatus.OK);
    }


    // 플레이리스트 삭제
    @DeleteMapping("/{playlist-id}")
    public String deletePlaylist(@PathVariable("playlist-id") @Positive long playlistId) {

        playlistService.deletePlaylist(playlistId);

        return "success playlist deleted";
    }

}
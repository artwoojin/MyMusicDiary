package com.seb42.main30.seb42_main_030.playlist.controller;//package com.seb42.main30.seb42_main_030.playlist.controller;
//
//
//import com.seb42.main30.seb42_main_030.exception.BusinessException;
//import com.seb42.main30.seb42_main_030.playlist.dto.PlaylistDto;
//import com.seb42.main30.seb42_main_030.playlist.entity.Playlist;
//import com.seb42.main30.seb42_main_030.playlist.mapper.PlaylistMapper;
//import com.seb42.main30.seb42_main_030.playlist.service.PlaylistService;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import javax.validation.Valid;
//import java.util.List;
//
//
//@RestController
//@CrossOrigin
//@RequestMapping("/playlist")
//public class PlaylistController {
//    private final PlaylistService playlistService;
//    private final PlaylistMapper mapper;
//
//
//    public PlaylistController (PlaylistService playlistService, PlaylistMapper mapper) {
//        this.playlistService = playlistService;
//        this.mapper = mapper;
//    }
//
//    //  등록
//    @PostMapping
//    public ResponseEntity createPlaylist (@Valid @RequestBody PlaylistDto.Post post) {
//
//        Playlist playlist = playlistService.createPlaylist (mapper.playlistPostToPlaylist(post));
//        PlaylistDto.Response response = mapper.playlistToPlaylistDto(playlist);
//
//        return new ResponseEntity<>(response, HttpStatus.CREATED);
//
//    }
//
//    // (각각) 조회
//    @GetMapping("/{playlist-id}")
//    public ResponseEntity getPlaylist (@PathVariable("playlist-id") long playlistId) throws BusinessException {
//        try {
//            Playlist playlist =playlistService.readPlaylist(playlistId);
//            PlaylistDto.Response response = mapper.playlistToPlaylistDto(playlist);
//            return new ResponseEntity<>(response, HttpStatus.OK);
//        } catch (BusinessException e) {
//            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    //    전체 조회
//    @GetMapping
//    public ResponseEntity getPlaylist () {
//        List<Playlist> playlists = playlistService.readPlaylists();
//        List<PlaylistDto.Response> responses = mapper.playlistsToResponses(playlists);
//        return new ResponseEntity(responses, HttpStatus.OK);
//    }
//
//
//    //    수정
//    @PatchMapping("/{playlist-id}")
//    public ResponseEntity patchPlaylist (@PathVariable("playlist-id") long playlistId,
//                                        @Valid @RequestBody PlaylistDto.Patch patch) throws BusinessException {
//        try {
//            Playlist playlist = playlistService.updatePlaylist(playlistId, mapper.playlistPatchToPlaylist(patch));
//            PlaylistDto.Response response = mapper.playlistToPlaylistDto(playlist);
//            return new ResponseEntity<>(response, HttpStatus.OK);
//        }catch (BusinessException e){
//            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    //    삭제
//    @DeleteMapping("/{playlist-id}")
//    public ResponseEntity deletPlaylist (@PathVariable("playlist-id") long playlistId) throws BusinessException {
//        try {
//            playlistService.deletePlaylist(playlistId);
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        }catch (BusinessException e){
//            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
//        }
//    }
//
//}
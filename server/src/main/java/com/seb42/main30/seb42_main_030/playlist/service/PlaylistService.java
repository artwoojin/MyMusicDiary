package com.seb42.main30.seb42_main_030.playlist.service;//package com.seb42.main30.seb42_main_030.playlist.service;
//
//import com.seb42.main30.seb42_main_030.exception.BusinessException;
//import com.seb42.main30.seb42_main_030.exception.ExceptionCode;
//import com.seb42.main30.seb42_main_030.playlist.entity.Playlist;
//import com.seb42.main30.seb42_main_030.playlist.repository.PlaylistRepository;
//import com.seb42.main30.seb42_main_030.user.entity.User;
//import com.seb42.main30.seb42_main_030.user.repository.UserRepository;
//import com.seb42.main30.seb42_main_030.user.service.UserService;
//import lombok.AllArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.List;
//import java.util.Optional;
//
//
//@Slf4j
//@Service
//@Transactional
//@AllArgsConstructor
//public class PlaylistService {
//    private final PlaylistRepository playlistRepository;
//    private final UserRepository userRepository;
//    private UserService userService;
//
//    public Playlist createPlaylist (Playlist playlist) {
//        findExistPlaylist(playlist.getPlaylistId());
//
//
//        long userId = userService.getLoginUser().getUserId();
//        User user = getUserFromId(userId);
//        playlist.setUser(user);
//        return playlistRepository.save(playlist);
//    }
//    //    read
//    private User getUserFromId(long userId) {return userRepository.findById(userId).get(); }
//
//    public Playlist readPlaylist(long playlistId) { return verifyPlaylist(playlistId); }
//
//    public List<Playlist> readPlaylists() { return playlistRepository.findAll(); }
//
//    //    update
//
//    public Playlist updatePlaylist (long playlistId, Playlist playlist) {
//        Playlist verifyPlaylist = verifyWriter(playlistId);
//        verifyPlaylist.setUrl(playlist.getUrl());
//
//        long userId = userService.getLoginUser().getUserId();
//        User user = getUserFromId(userId);
//        playlist.setUser(user);
//
//        return playlistRepository.save(playlist);
//    }
//
//    //    delete
//    public void deletePlaylist (long playlistId) {
//
//        Playlist verifyPlaylist = verifyWriter(playlistId);
//        playlistRepository.deleteById(verifyPlaylist.getPlaylistId());
//
//    }
//
//
//    //    ID 값의 댓글이 없으면 오류
//
//    private Playlist verifyPlaylist (long playlistId){
//
//        Optional<Playlist> optionalPlaylist = playlistRepository.findById(playlistId);
//
//        return optionalPlaylist.orElseThrow(() -> new BusinessException(ExceptionCode.NOT_FOUND) );
//
//    }
//
//
//    private void findExistPlaylist (long playlistId) {
//
//        Optional<Playlist> optionalPlaylist = playlistRepository.findById(playlistId);
//        if (optionalPlaylist.isPresent()) {
//            throw new BusinessException(ExceptionCode.NOT_FOUND);
//        }
//    }
//
//    private Playlist verifyWriter (long playlistId) {
//
//        long userId = userService.getLoginUser().getUserId();
//        Playlist playlist = verifyPlaylist(playlistId);
//        if (playlist.getUser().getUserId() != userId) {
//            throw new BusinessException(ExceptionCode.NOT_AUTHORITY);
//        }
//        return playlist;
//    }
//
//}
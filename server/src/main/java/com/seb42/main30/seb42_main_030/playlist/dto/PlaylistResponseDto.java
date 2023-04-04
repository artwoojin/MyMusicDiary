package com.seb42.main30.seb42_main_030.playlist.dto;


import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PlaylistResponseDto {

    private String title;
    private String thumbnail;
    private String url;
    private String channelId;

}

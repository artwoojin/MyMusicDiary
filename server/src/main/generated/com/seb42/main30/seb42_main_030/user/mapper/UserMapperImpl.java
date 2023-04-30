package com.seb42.main30.seb42_main_030.user.mapper;

import com.seb42.main30.seb42_main_030.user.dto.UserDto;
import com.seb42.main30.seb42_main_030.user.entity.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-04-29T03:46:53+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User userPostToUser(UserDto.Post post) {
        if ( post == null ) {
            return null;
        }

        User user = new User();

        user.setEmail( post.getEmail() );
        user.setNickname( post.getNickname() );
        user.setPassword( post.getPassword() );
        user.setImageUrl( post.getImageUrl() );

        return user;
    }

    @Override
    public User userPatchToUser(UserDto.Patch patch) {
        if ( patch == null ) {
            return null;
        }

        User user = new User();

        user.setUserId( patch.getUserId() );
        user.setNickname( patch.getNickname() );
        user.setPassword( patch.getPassword() );
        user.setImageUrl( patch.getImageUrl() );

        return user;
    }

    @Override
    public UserDto.Response userToUserResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto.Response response = new UserDto.Response();

        response.setUserId( user.getUserId() );
        response.setNickname( user.getNickname() );
        response.setEmail( user.getEmail() );
        response.setPassword( user.getPassword() );
        response.setImageUrl( user.getImageUrl() );

        return response;
    }

    @Override
    public List<UserDto.Response> usersToUserResponses(List<User> users) {
        if ( users == null ) {
            return null;
        }

        List<UserDto.Response> list = new ArrayList<UserDto.Response>( users.size() );
        for ( User user : users ) {
            list.add( userToUserResponse( user ) );
        }

        return list;
    }

    @Override
    public UserDto.MyPage userToMyPage(User findUser) {
        if ( findUser == null ) {
            return null;
        }

        UserDto.MyPage myPage = new UserDto.MyPage();

        myPage.setUserId( findUser.getUserId() );
        myPage.setNickname( findUser.getNickname() );
        myPage.setEmail( findUser.getEmail() );
        myPage.setPassword( findUser.getPassword() );
        myPage.setImageUrl( findUser.getImageUrl() );

        return myPage;
    }
}

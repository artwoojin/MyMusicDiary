package com.seb42.main30.seb42_main_030.user.mapper;

import com.seb42.main30.seb42_main_030.user.dto.UserDto;
import com.seb42.main30.seb42_main_030.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Mapper(componentModel = "spring")
public interface UserMapper {
    User userPostToUser(UserDto.Post post);

    User userPatchToUser(UserDto.Patch patch);

    UserDto.Response userToUserResponse(User user);

    List<UserDto.Response> usersToUserResponses(List<User> users);

    UserDto.MyPage userToMyPage(User findUser);

    void updateUserFromPatch(@MappingTarget User user, UserDto.Patch patch);


}

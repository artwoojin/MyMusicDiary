package com.seb42.main30.seb42_main_030.image;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@ConfigurationProperties(prefix= "cloud.aws.s3")
@Component
public class S3Component {

    private String bucket;

}
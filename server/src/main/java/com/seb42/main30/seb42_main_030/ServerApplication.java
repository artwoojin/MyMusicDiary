package com.seb42.main30.seb42_main_030;

import com.seb42.main30.seb42_main_030.tag.entity.Tag;
import com.seb42.main30.seb42_main_030.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.Arrays;
import java.util.List;

//@EnableScheduling
//@EnableBatchProcessing


@SpringBootApplication
@RequiredArgsConstructor
@EnableAsync
public class ServerApplication  {

	private final TagRepository tagRepository;

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	}


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
public class ServerApplication implements CommandLineRunner {

	private final TagRepository tagRepository;

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Override
	public void run(String[] args) {
		final List<Tag> tags = Arrays.asList(
				new Tag(1, "#신나는"),
				new Tag(2, "#감성적인"),
				new Tag(3, "#잔잔한"),
				new Tag(4, "#애절한"),
				new Tag(5, "#그루브한"),
				new Tag(6, "#몽환적인"),
				new Tag(7,"#어쿠스틱한"),
				new Tag(8,"#청량한")

		);
		for (Tag tag : tags){
			if (tagRepository.findByTagName(tag.getTagName()).isEmpty()){
				tagRepository.save(tag);
			}
		}
	}

}

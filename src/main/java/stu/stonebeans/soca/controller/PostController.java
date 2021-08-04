package stu.stonebeans.soca.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import stu.stonebeans.soca.sbo.PostSBO;
import stu.stonebeans.soca.vo.PostVO;

import java.util.HashMap;
import java.util.List;

@RestController
public class PostController {

    private PostSBO postSBO;

    @Autowired
    public PostController(PostSBO postSBO) { this.postSBO = postSBO;}

    @RequestMapping(value = "/getAllPosts", method = RequestMethod.POST)
    public List<PostVO> getAllPosts() {
        return postSBO.getAllPosts();
    }

    // 해당 postNum의 게시글을 불러옴
    @RequestMapping(value = "/getPostByNum", method = RequestMethod.POST)
    public PostVO getPostByNum(@RequestBody int postNum) {
        return postSBO.getPostByNum(postNum);
    }

    // 해당 subjectID의 과목이름을 불러옴
    @RequestMapping(value = "/getSubjectName", method = RequestMethod.POST)
    public String getSubjectName(@RequestBody HashMap<String, String> map) {
        return postSBO.getSubjectName(map);
    }
}

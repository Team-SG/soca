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
    public List<PostVO> getAllPosts(@RequestBody Object checked) {
        return postSBO.getAllPosts(checked);
    }
}

package stu.stonebeans.soca.sbo.impl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stu.stonebeans.soca.dao.PostDAO;
import stu.stonebeans.soca.sbo.PostSBO;
import stu.stonebeans.soca.vo.PostVO;

import java.util.List;

@Service
@AllArgsConstructor
public class PostSBOImpl implements PostSBO {
    @Autowired
    private PostDAO postDAO;

    @Override
    public List<PostVO> getAllPosts() {
        return postDAO.getAllPosts();
    }
}


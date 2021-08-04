package stu.stonebeans.soca.sbo;

import stu.stonebeans.soca.vo.PostVO;

import java.util.List;

public interface PostSBO {
    List<PostVO> getAllPosts(Object checked);
}

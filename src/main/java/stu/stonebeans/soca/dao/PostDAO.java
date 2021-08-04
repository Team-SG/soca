package stu.stonebeans.soca.dao;

import org.apache.ibatis.annotations.Mapper;
import stu.stonebeans.soca.vo.PostVO;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface PostDAO {
    List<PostVO> getAllPosts();

    // 해당 postNum의 게시글을 불러옴
    PostVO getPostByNum(int postNum);
}

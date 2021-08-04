package stu.stonebeans.soca.dao;

import org.apache.ibatis.annotations.Mapper;
import stu.stonebeans.soca.vo.PostVO;

import java.util.List;

@Mapper
public interface PostDAO {
    List<PostVO> getAllPosts();
    List<PostVO> getUnsolvedPosts();
}

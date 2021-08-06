package stu.stonebeans.soca.dao;

import org.apache.ibatis.annotations.Mapper;
import stu.stonebeans.soca.vo.PostVO;
import stu.stonebeans.soca.vo.SubjectVO;
import stu.stonebeans.soca.vo.ReplyVO;


import java.util.HashMap;
import java.util.List;

@Mapper
public interface PostDAO {
    List<PostVO> getAllPosts();
    List<PostVO> getUnsolvedPosts();

    List<PostVO> getSelectedBySubject(HashMap<String, Object> map);
    List<PostVO> getSelectedByTitle(HashMap<String, Object> map);
    List<PostVO> getUnsolvedBySubject(HashMap<String, Object> map);
    List<PostVO> getUnsolvedByTitle(HashMap<String, Object> map);

    // 해당 postNum의 게시글을 불러옴
    PostVO getPostByNum(int postNum);

    //답글 쓰기
    void writeReply(HashMap<String,Object> map);

    //답글 불러오기
    List<ReplyVO> getReplies(int postNum);
}

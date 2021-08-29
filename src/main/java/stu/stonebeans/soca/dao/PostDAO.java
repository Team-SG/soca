package stu.stonebeans.soca.dao;

import org.apache.ibatis.annotations.Mapper;
import stu.stonebeans.soca.vo.*;

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

    //대댓글 쓰기
    void writeRereply(HashMap<String,String> map);

    //답글 불러오기
    List<RereplyVO> getRereplies(int replyNum);

    //해결된 질문으로 변경
    void updateSolved(int postNum);

    // post 신고하기
    void accusePost(HashMap<String,String> map);

    // reply 신고하기
    void accuseReply(HashMap<String,String> map);

    // rereply 신고하기
    void accuseRereply(HashMap<String,String> map);

    // post 삭제하기
    void deletePost(HashMap<String,String> map);

    // reply 삭제하기
    void deleteReply(HashMap<String,String> map);

    // rereply 삭제하기
    void deleteRereply(HashMap<String,String> map);

    //게시물 작성하기
    Integer writePost(HashMap<String,String> map);

    //게시물 수정하기
    void revisePost(HashMap<String,String> map);

    List<PostVO> getMainPost();

    void updateViews(int postNum);

    List<AccuseVO> getAccuse();
    List<AccuseVO> getAccuse2();

    AccuseVO getAccuseSelected(int num);
}

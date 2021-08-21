package stu.stonebeans.soca.sbo;

import stu.stonebeans.soca.vo.PostVO;
import stu.stonebeans.soca.vo.SubjectVO;
import stu.stonebeans.soca.vo.ReplyVO;
import stu.stonebeans.soca.vo.RereplyVO;

import java.util.HashMap;
import java.util.List;

public interface PostSBO {
    // 전체 Posts 가져옴
    List<PostVO> getAllPosts(Object checked);

    // SearchKey 해당 Posts 가져옴
    List<PostVO> getSelectedPosts(HashMap<String, Object> map);

    // 해당 postNum의 게시글을 불러옴
    PostVO getPostByNum(int postNum);

    //답글 쓰기
    void writeReply(HashMap<String,Object> map);

    //답글 불러오기
    List<ReplyVO> getReplies(int postNum);

    //대댓글 쓰기
    void writeRereply(HashMap<String,String> map);

    //대댓글 불러오기
    List<RereplyVO> getRereplies(int replyNum);

    //해결된 질문으로 변경
    void updateSolved(int postNum);

    //신고하기
    void accuse(HashMap<String,String> map);

    //삭제하기
    void deletePost(HashMap<String,String> map);

    //게시물 작성하기
    Integer writePost(HashMap<String,String> map);

    //게시물 수정하기
    void revisePost(HashMap<String,String> map);
}

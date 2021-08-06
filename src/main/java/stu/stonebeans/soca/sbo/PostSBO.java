package stu.stonebeans.soca.sbo;

import stu.stonebeans.soca.vo.PostVO;
import stu.stonebeans.soca.vo.SubjectVO;
import stu.stonebeans.soca.vo.ReplyVO;

import java.util.HashMap;
import java.util.List;

public interface PostSBO {
    // 전체 Posts 가져옴
    List<PostVO> getAllPosts(Object checked);

    // SearchKey 해당 Posts 가져옴
    List<PostVO> getSelectedPosts(HashMap<String, Object> map);

    // 해당 postNum의 게시글을 불러옴
    PostVO getPostByNum(int postNum);

    // 해당 subjectID의 과목이름을 불러옴
    SubjectVO getSubjectName(HashMap<String, String> map);

    //답글 쓰기
    void writeReply(HashMap<String,Object> map);

    //답글 불러오기
    List<ReplyVO> getReplies(int postNum);
}

package stu.stonebeans.soca.sbo;

import stu.stonebeans.soca.vo.PostVO;

import java.util.HashMap;
import java.util.List;

public interface PostSBO {
    List<PostVO> getAllPosts();

    // 해당 postNum의 게시글을 불러옴
    PostVO getPostByNum(int postNum);

    // 해당 subjectID의 과목이름을 불러옴
    String getSubjectName(HashMap<String, String> map);
}

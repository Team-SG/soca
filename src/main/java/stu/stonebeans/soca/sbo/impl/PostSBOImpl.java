package stu.stonebeans.soca.sbo.impl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stu.stonebeans.soca.dao.PostDAO;
import stu.stonebeans.soca.sbo.PostSBO;
import stu.stonebeans.soca.vo.PostVO;
import stu.stonebeans.soca.vo.SubjectVO;


import java.util.HashMap;
import java.util.List;

@Service
@AllArgsConstructor
public class PostSBOImpl implements PostSBO {
    @Autowired
    private PostDAO postDAO;

    @Override
    public List<PostVO> getAllPosts(Object checked) {
        if(checked.equals("0"))
            return postDAO.getAllPosts();
        else
            return postDAO.getUnsolvedPosts();
    }

    @Override
    public List<PostVO> getSelectedPosts(HashMap<String, Object> map) {
        if(map.get("searchType").equals("subject")) {
            return postDAO.getSelectedBySubject(map);
        }
        else if (map.get("searchType").equals("title")) {
            return postDAO.getSelectedByTitle(map);
        }
        return null;
    }

    // 해당 postNum의 게시글을 불러옴
    @Override
    public PostVO getPostByNum(int postNum){ return postDAO.getPostByNum(postNum);}

    // 해당 subjectID의 과목이름을 불러옴
    @Override
    public SubjectVO getSubjectName(HashMap<String, String> map){ return postDAO.getSubjectName(map);}

    //답글 쓰기
    @Override
    public void writeReply(HashMap<String,Object> map){ postDAO.writeReply(map);}
}


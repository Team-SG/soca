package stu.stonebeans.soca.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import stu.stonebeans.soca.sbo.EvaluateSBO;
import stu.stonebeans.soca.sbo.PostSBO;
import stu.stonebeans.soca.vo.PostVO;
import stu.stonebeans.soca.vo.SubjectVO;
import stu.stonebeans.soca.vo.ReplyVO;
import stu.stonebeans.soca.vo.RereplyVO;



import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;



@RestController
public class PostController {

    private PostSBO postSBO;

    @Autowired
    public PostController(PostSBO postSBO) { this.postSBO = postSBO;}

    // 모든 Post들을 가져옴
    @RequestMapping(value = "/getAllPosts", method = RequestMethod.POST)
    public List<PostVO> getAllPosts(@RequestBody Object checked) {
        return postSBO.getAllPosts(checked);
    }

    // SearchKey에 맞는 Post들을 가져옴
    @RequestMapping(value = "/getSelectedPosts", method = RequestMethod.POST)
    public List<PostVO> getSelectedPosts(@RequestBody HashMap<String, Object> map) { return postSBO.getSelectedPosts(map); }

    // 해당 postNum의 게시글을 불러옴
    @RequestMapping(value = "/getPostByNum", method = RequestMethod.POST)
    public PostVO getPostByNum(@RequestBody int postNum) {
        return postSBO.getPostByNum(postNum);
    }

    //답글 쓰기
    @RequestMapping(value = "/writeReply", method = RequestMethod.POST)
    public void writeReply(HttpSession session ,@RequestBody HashMap<String,Object> map){
        map.put("email",(String)session.getAttribute("email"));
        postSBO.writeReply(map);
    }

    //답글 불러오기
    @RequestMapping(value = "/getReplies", method = RequestMethod.POST)
    public List<ReplyVO> getReplies(@RequestBody int postNum) { return postSBO.getReplies(postNum); }


    //대댓글 쓰기
    @RequestMapping(value = "/writeRereply", method = RequestMethod.POST)
    public void writeRereply(HttpSession session ,@RequestBody HashMap<String,String> map){
        map.put("email",(String)session.getAttribute("email"));
        postSBO.writeRereply(map);
    }

    //대댓글 불러오기
    @RequestMapping(value = "/getRereplies", method = RequestMethod.POST)
    public List<RereplyVO> getRereplies(@RequestBody int replyNum) { return postSBO.getRereplies(replyNum); }

    //viewer email 가져오기
    @RequestMapping(value = "/getViewerEmail", method = RequestMethod.POST)
    public HashMap<String,String> getViewerEmail(HttpSession session){
        HashMap<String,String> map = new HashMap<>();
        map.put("email",(String)session.getAttribute("email"));
        return map;
    }

    //해결된 질문으로 변경
    @RequestMapping(value = "/updateSolved", method = RequestMethod.POST)
    public void updateSolved(@RequestBody int postNum){ postSBO.updateSolved(postNum); }
}

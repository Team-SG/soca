package stu.stonebeans.soca.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import stu.stonebeans.soca.sbo.impl.BoardSBOImpl;
import stu.stonebeans.soca.vo.BoardVO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
/*
@RestController
public class BoardController {
    @RequestMapping("list.do")

    public ModelAndView list(@RequestParam(defaultValue = "title") String searchOption,
                             @RequestParam(defaultValue = "") String keyword,
                             @RequestParam(defaultValue = "1") int curPage) throws Exception{


        // 레코드 개수 계산
        int count = boardService.countArticle(searchOption, keyword);

        // 페이지 수 나누기
        BoardSBOImpl.BoardPager boardPager = new BoardSBOImpl.BoardPager(count, curPage);
        int start = boardPager.getPageBegin();
        int end = boardPager.getPageEnd();

        List<BoardVO> list = boardService.listAll(start, end, searchOption, keyword);

        // 데이터를 맵에 저장
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("list", list); // 리스트
        map.put("count", count); // 레코드 개수
        map.put("searchOption", searchOption); // 검색 옵션
        map.put("keyword", keyword); // 검색 키워드
        map.put("boardPager", boardPager);

        // ModelAndView - 모델과 뷰
        ModelAndView mav = new ModelAndView();
        mav.addObject("map", map); // 맵에 저장된 데이터를 mav에 저장
        mav.setViewName("board/list"); // 뷰를 list.jsp로 설정

        return mav; // list.jsp로 리스트 전달
    }
}
*/
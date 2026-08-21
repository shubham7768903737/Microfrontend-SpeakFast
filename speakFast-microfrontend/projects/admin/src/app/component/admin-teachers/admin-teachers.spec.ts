import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { AdminTeachers, Teacher } from './admin-teachers';
import { AdminService } from '../../core/services/admin.service';
import { AlertService } from '../../core/services/alert.service';

describe('AdminTeachers', () => {
  let component: AdminTeachers;
  let fixture: ComponentFixture<AdminTeachers>;
  let adminServiceSpy: {
    getAllTeachers: ReturnType<typeof vi.fn>;
    deleteSpecificTeacher: ReturnType<typeof vi.fn>;
  };
  let alertServiceSpy: {
    confirm: ReturnType<typeof vi.fn>;
    toasterSuccess: ReturnType<typeof vi.fn>;
    error: ReturnType<typeof vi.fn>;
  };

  const mockTeacher = (overrides: Partial<Teacher> = {}): Teacher => ({
    _id: '1',
    userId: { firstName: 'John', lastName: 'Doe', email: 'john@test.com' },
    slots: [],
    ...overrides,
  });

  beforeEach(async () => {
    adminServiceSpy = {
      getAllTeachers: vi.fn().mockReturnValue(of({ data: [], total: 0 })),
      deleteSpecificTeacher: vi.fn().mockReturnValue(of({})),
    };
    alertServiceSpy = {
      confirm: vi.fn().mockResolvedValue({ isConfirmed: true }),
      toasterSuccess: vi.fn(),
      error: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [AdminTeachers],
      providers: [
        { provide: AdminService, useValue: adminServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTeachers);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load teachers on init', () => {
      const loadSpy = vi.spyOn(component, 'loadTeachers');

      component.ngOnInit();

      expect(loadSpy).toHaveBeenCalled();
    });
  });

  describe('loadTeachers', () => {
    it('should populate teachers from the API response, filtering out null userId entries', () => {
      const validTeacher = mockTeacher({ _id: '1' });
      const orphanTeacher = { _id: '2', userId: null, slots: [] } as unknown as Teacher;
      adminServiceSpy.getAllTeachers.mockReturnValue(
        of({ data: [validTeacher, orphanTeacher], total: 5 })
      );

      component.loadTeachers();

      expect(component.teachers.length).toBe(1);
      expect(component.teachers[0]._id).toBe('1');
    });

    it('should default teachers to an empty array when data is missing from the response', () => {
      adminServiceSpy.getAllTeachers.mockReturnValue(of({}));

      component.loadTeachers();

      expect(component.teachers).toEqual([]);
    });

    it('should emit shareTeacherCount with the response total', () => {
      adminServiceSpy.getAllTeachers.mockReturnValue(of({ data: [], total: 42 }));
      const emitSpy = vi.spyOn(component.shareTeacherCount, 'emit');

      component.loadTeachers();

      expect(emitSpy).toHaveBeenCalledWith(42);
    });

    it('should leave loading false after a successful response', () => {
      component.loadTeachers();

      expect(component.loading()).toBe(false);
    });

    it('should stop loading and not throw when the API errors', () => {
      adminServiceSpy.getAllTeachers.mockReturnValue(
        throwError(() => new Error('network error'))
      );

      expect(() => component.loadTeachers()).not.toThrow();
      expect(component.loading()).toBe(false);
    });
  });

  describe('onTeacherAdded', () => {
    it('should reload teachers and close the drawer', () => {
      const loadSpy = vi.spyOn(component, 'loadTeachers');
      component.drawerOpen = true;
      component.teacherBeingEdited = mockTeacher();

      component.onTeacherAdded();

      expect(loadSpy).toHaveBeenCalled();
      expect(component.drawerOpen).toBe(false);
      expect(component.teacherBeingEdited).toBeNull();
    });
  });

  describe('onEditTeacher', () => {
    it('should set the teacher being edited and open the drawer', () => {
      const teacher = mockTeacher();

      component.onEditTeacher(teacher);

      expect(component.teacherBeingEdited).toBe(teacher);
      expect(component.drawerOpen).toBe(true);
    });
  });

  describe('filteredTeachers', () => {
    beforeEach(() => {
      component.teachers = [
        mockTeacher({
          _id: '1',
          userId: { firstName: 'Alice', lastName: 'Smith', email: 'alice@test.com' },
        }),
        mockTeacher({
          _id: '2',
          userId: { firstName: 'Bob', lastName: 'Jones', email: 'bob@test.com' },
        }),
      ];
    });

    it('should return all teachers when the search term is empty', () => {
      component.searchTerm = '';

      expect(component.filteredTeachers.length).toBe(2);
    });

    it('should filter by name case-insensitively', () => {
      component.searchTerm = 'alice';

      expect(component.filteredTeachers.map(t => t._id)).toEqual(['1']);
    });

    it('should filter by email', () => {
      component.searchTerm = 'bob@test.com';

      expect(component.filteredTeachers.map(t => t._id)).toEqual(['2']);
    });

    it('should trim whitespace from the search term', () => {
      component.searchTerm = '  alice  ';

      expect(component.filteredTeachers.length).toBe(1);
    });

    it('should return an empty array when nothing matches', () => {
      component.searchTerm = 'nonexistent';

      expect(component.filteredTeachers).toEqual([]);
    });
  });

  describe('totalTeachers', () => {
    it('should return the number of loaded teachers', () => {
      component.teachers = [mockTeacher({ _id: '1' }), mockTeacher({ _id: '2' })];

      expect(component.totalTeachers).toBe(2);
    });
  });

  describe('pagination', () => {
    function setTeacherCount(count: number): void {
      component.teachers = Array.from({ length: count }, (_, i) => mockTeacher({ _id: String(i) }));
    }

    it('totalPages should be at least 1 even with no teachers', () => {
      setTeacherCount(0);

      expect(component.totalPages).toBe(1);
    });

    it('totalPages should be the ceiling of teacher count over page size', () => {
      setTeacherCount(25);

      expect(component.totalPages).toBe(3);
    });

    it('paginatedTeachers should return the correct page slice', () => {
      setTeacherCount(25);
      component.currentPage.set(2);

      expect(component.paginatedTeachers.length).toBe(10);
      expect(component.paginatedTeachers[0]._id).toBe('10');
    });

    it('pageNumbers should list every page when total pages is 7 or fewer', () => {
      setTeacherCount(45); // 5 pages

      expect(component.pageNumbers).toEqual([1, 2, 3, 4, 5]);
    });

    it('pageNumbers should show a single ellipsis when current page is near the start', () => {
      setTeacherCount(100); // 10 pages
      component.currentPage.set(1);

      expect(component.pageNumbers).toEqual([1, 2, 3, '...', 9, 10]);
    });

    it('pageNumbers should show two ellipses when current page is in the middle', () => {
      setTeacherCount(100); // 10 pages
      component.currentPage.set(5);

      expect(component.pageNumbers).toEqual([1, 2, 3, '...', 5, '...', 9, 10]);
    });

    it('pageNumbers should show a single ellipsis when current page is near the end', () => {
      setTeacherCount(100); // 10 pages
      component.currentPage.set(10);

      expect(component.pageNumbers).toEqual([1, 2, 3, '...', 9, 10]);
    });

    it('goToPage should update the current page for a valid page number', () => {
      setTeacherCount(25);

      component.goToPage(2);

      expect(component.currentPage()).toBe(2);
    });

    it('goToPage should ignore non-numeric input', () => {
      setTeacherCount(25);

      component.goToPage('...');

      expect(component.currentPage()).toBe(1);
    });

    it('goToPage should ignore out-of-range page numbers', () => {
      setTeacherCount(25);

      component.goToPage(0);
      expect(component.currentPage()).toBe(1);

      component.goToPage(99);
      expect(component.currentPage()).toBe(1);
    });

    it('nextPage should advance the page while below the total', () => {
      setTeacherCount(25);

      component.nextPage();

      expect(component.currentPage()).toBe(2);
    });

    it('nextPage should not advance past the last page', () => {
      setTeacherCount(5); // 1 page

      component.nextPage();

      expect(component.currentPage()).toBe(1);
    });

    it('prevPage should go back while above the first page', () => {
      setTeacherCount(25);
      component.currentPage.set(2);

      component.prevPage();

      expect(component.currentPage()).toBe(1);
    });

    it('prevPage should not go below the first page', () => {
      setTeacherCount(25);

      component.prevPage();

      expect(component.currentPage()).toBe(1);
    });
  });

  describe('onSearchChange', () => {
    it('should reset the current page to 1', () => {
      component.currentPage.set(3);

      component.onSearchChange();

      expect(component.currentPage()).toBe(1);
    });
  });

  describe('drawer controls', () => {
    it('openDrawer should clear the edited teacher and open the drawer', () => {
      component.teacherBeingEdited = mockTeacher();

      component.openDrawer();

      expect(component.teacherBeingEdited).toBeNull();
      expect(component.drawerOpen).toBe(true);
    });

    it('onDrawerClose should close the drawer and clear the edited teacher', () => {
      component.drawerOpen = true;
      component.teacherBeingEdited = mockTeacher();

      component.onDrawerClose();

      expect(component.drawerOpen).toBe(false);
      expect(component.teacherBeingEdited).toBeNull();
    });
  });

  describe('deleteTeacher', () => {
    beforeEach(() => {
      vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    });

    it('should ask for confirmation naming the teacher', async () => {
      const teacher = mockTeacher({
        userId: { firstName: 'Jane', lastName: 'Roe', email: 'jane@test.com' },
      });

      await component.deleteTeacher(teacher);

      expect(alertServiceSpy.confirm).toHaveBeenCalledWith(
        'Are you sure?',
        expect.stringContaining('Jane Roe'),
        'warning',
        'Yes, Delete',
        'Cancel'
      );
    });

    it('should not delete the teacher when the confirmation is cancelled', async () => {
      alertServiceSpy.confirm.mockResolvedValue({ isConfirmed: false });
      const teacher = mockTeacher();

      await component.deleteTeacher(teacher);

      expect(adminServiceSpy.deleteSpecificTeacher).not.toHaveBeenCalled();
    });

    it('should delete the teacher, reload the list and show a success toast when confirmed', async () => {
      alertServiceSpy.confirm.mockResolvedValue({ isConfirmed: true });
      const loadSpy = vi.spyOn(component, 'loadTeachers');
      const teacher = mockTeacher({ _id: 'teacher-1' });

      await component.deleteTeacher(teacher);

      expect(adminServiceSpy.deleteSpecificTeacher).toHaveBeenCalledWith('teacher-1');
      expect(loadSpy).toHaveBeenCalled();
      expect(alertServiceSpy.toasterSuccess).toHaveBeenCalledWith('Teacher deleted successfully.');
    });

    it('should show the API error message when deletion fails', async () => {
      alertServiceSpy.confirm.mockResolvedValue({ isConfirmed: true });
      adminServiceSpy.deleteSpecificTeacher.mockReturnValue(
        throwError(() => ({ error: { message: 'Delete failed' } }))
      );
      const teacher = mockTeacher();

      await component.deleteTeacher(teacher);

      expect(alertServiceSpy.error).toHaveBeenCalledWith('Error!', 'Delete failed');
    });

    it('should show a generic error message when the API gives none', async () => {
      alertServiceSpy.confirm.mockResolvedValue({ isConfirmed: true });
      adminServiceSpy.deleteSpecificTeacher.mockReturnValue(throwError(() => ({})));
      const teacher = mockTeacher();

      await component.deleteTeacher(teacher);

      expect(alertServiceSpy.error).toHaveBeenCalledWith('Error!', 'Something went wrong.');
    });
  });
});
